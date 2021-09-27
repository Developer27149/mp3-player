import axios from "axios";
export default async function initData() {
  const { data } = await axios.get("https://110.42.133.25/api/songs");
  return data.data;
}
