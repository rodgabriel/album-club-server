import { getUserById, getAllUsers } from "./user";
import { getClubById, getAllClubs } from "./club";

const Query = {
  user: getUserById,
  users: getAllUsers,
  club: getClubById,
  clubs: getAllClubs,
};

export default Query;
