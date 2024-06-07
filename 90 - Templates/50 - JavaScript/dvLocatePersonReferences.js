const pagesWithTopic = await Promise.all(
    dv
    .pages()
    .map(n => new Promise(async (resolve, reject) => {
        const content = await dv.io.load(n.file.path);
        resolve({
            link: n.file.link,
            content
        });
    }))
);

const topicsByPage = pagesWithTopic.map(({
    link,
    content
}) => ({
    link,
    content: content
	    .split('\n\n')
        .filter(content => content.includes(dv.current().file.name))
}));

topicsByPage.forEach(
    page =>
    page.content.forEach(
        n => dv.paragraph(`${n} (${page.link})`)
    )
);