export default async (req, res) => {
  const { country, category } = req.query;

  try {
    const apiResponse = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}`,
      {
        headers: {
          "X-Api-Key": process.env.NEWS_API_KEY,
        },
      }
    );

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
