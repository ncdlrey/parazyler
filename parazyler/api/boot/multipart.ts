import type { Server } from "gadget-server";
import multipart from "@fastify/multipart";

export default async function plugin(server: Server) {
  await server.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB file size limit
    },
  });

  // You can add more configurations or routes here
}
