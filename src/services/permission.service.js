import prisma from '../common/prisma/init.prisma.js';

const permissionService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `This action returns all permission`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} permission`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} permission`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} permission`;
   },
   groupByModule: async function (req) {
    //const permissions = await prisma.permissions.findMany();
      return `This action groupByModule a id: ${req.params.id} permission`;
   },
};

export default permissionService;