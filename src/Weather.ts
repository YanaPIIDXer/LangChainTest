import axios from "axios";
import { Tool } from "langchain/tools";

/**
 * 指定した場所の天気を取得する
 * @param place 場所
 */
export const fetchWeather = async (place: string): Promise<string> => {
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
    return response.data.weather[0].main;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 天気予報取得Tool
 * 車輪の再発明になってるっぽいけど気にしない
 */
export class WeatherFetchTool extends Tool {
  protected async _call(arg: any): Promise<string> {
    return await fetchWeather(arg);
  }
  name: string = "Weather Fetch Tool";
  description: string = "API to get weather forecast";
}
