const playlists = [
    { id: "PLOZ1_i7WA_EAeKcYgHWr9MjHlK8JCDJKr", name: "Kubernetes" }
];

async function fetchPlaylist(id: string) {
    const url = `https://www.youtube.com/playlist?list=${id}`;
    try {
        const response = await fetch(url);
        const html = await response.text();
        const match = html.match(/var ytInitialData = ({.*?});/);
        if (!match) {
            console.error(`Failed to find ytInitialData for playlist ${id}`);
            return null;
        }

        const data = JSON.parse(match[1]);
        const playlistTitle = data.metadata?.playlistMetadataRenderer?.title;

        // Try to safely access contents
        const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs;
        const tabRenderer = tabs?.[0]?.tabRenderer;
        const sectionList = tabRenderer?.content?.sectionListRenderer;
        const contents = sectionList?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer?.contents;

        if (!contents) {
            console.error(`Failed to find contents for playlist ${id} (${playlistTitle})`);
            return null;
        }

        const videos = contents
            .filter((item: any) => item.playlistVideoRenderer)
            .map((item: any) => {
                const r = item.playlistVideoRenderer;
                const videoInfo = r.videoInfo?.runs || [];
                const viewsText = videoInfo.find((run: any) => run.text.includes("view"))?.text || "0 views";
                const dateText = videoInfo.find((run: any) => run.text.includes("ago"))?.text || "Jan 1, 2024";

                return {
                    id: r.videoId,
                    title: r.title.runs[0].text,
                    views: parseInt(viewsText.replace(/,/g, "")) || 0,
                    date: dateText
                };
            });

        return { id, playlistTitle, videos };
    } catch (e) {
        console.error(`Error fetching playlist ${id}:`, e);
        return null;
    }
}

for (const p of playlists) {
    console.log(`Starting fetch for ${p.name}...`);
    const data = await fetchPlaylist(p.id);
    if (data) {
        console.log(`\n--- Playlist: ${data.playlistTitle} (${p.name}) ---`);
        console.log(JSON.stringify(data.videos, null, 2));
    } else {
        console.log(`Failed to fetch ${p.name}`);
    }
}
