import axios from "axios";
export default async function initData() {
  const { data } = await axios.get("http://110.42.133.25:3333/api/songs");
  return data.data;
}
