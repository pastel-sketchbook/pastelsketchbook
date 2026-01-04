const url = "https://www.youtube.com/playlist?list=PLOZ1_i7WA_ED7Bdhz48-YqxpeZ4qszwvK";
const response = await fetch(url);
const html = await response.text();

const match = html.match(/var ytInitialData = ({.*?});/);
if (match) {
    const data = JSON.parse(match[1]);
    const contents = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;

    const videos = contents
        .filter((item: any) => item.playlistVideoRenderer)
        .map((item: any) => ({
            id: item.playlistVideoRenderer.videoId,
            title: item.playlistVideoRenderer.title.runs[0].text
        }));

    console.log(JSON.stringify(videos, null, 2));
} else {
    console.log("Could not find ytInitialData");
}
