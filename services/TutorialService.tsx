import axios from "axios";

const getAll = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`);
};
const get = (id: any) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/${id}`
  );
};
const create = (data: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`,
    data
  );
};
const update = (id: any, data: any) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/${id}`,
    data
  );
};
const remove = (id: any) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/${id}`
  );
};
const removeAll = () => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`
  );
};
const findByTitle = (title: any) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list?title=${title}`
  );
};
const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default TutorialService;
