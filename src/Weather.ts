import axios from "axios";

export const fetchWeather = async (place: string): Promise<void> => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: place,
          units: "metric",
          lang: "ja",
          APPID: process.env.OPEN_WEATHER_API_KEY,
        },
      }
    );
    if (response.status !== 200) {
      throw response;
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
