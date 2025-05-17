const News = require('../models/News');
exports.createNews = async (req, res) => {
  const news = await News.create({ title: req.body.title, content: req.body.content, author: req.user._id });
  res.json(news);
};
exports.getNews = async (req, res) => res.json(await News.find());
exports.deleteNews = async (req, res) => {
  const { id } = req.params;
  const news = await News.findByIdAndDelete(id);
  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }
  res.json({ message: 'News deleted successfully' });
}