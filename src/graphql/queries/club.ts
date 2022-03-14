import { PrismaContext } from "src/context";

const getClubById = (
  _parent: any,
  args: { id: number },
  context: PrismaContext
) => {
  const club = context.club.findUnique({
    where: { id: Number(args.id) },
    include: {
      members: { include: { user: true } },
    },
  });

  return club;
};

const getAllClubs = (_parent: any, _args: any, context: PrismaContext) => {
  const clubs = context.club.findMany({
    include: {
      members: { include: { user: true } },
    },
  });
  return clubs;
};

export { getClubById, getAllClubs };
