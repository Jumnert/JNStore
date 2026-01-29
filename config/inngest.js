import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/user";

export const inngest = new Inngest({ id: "JNStore" });

//fn create User
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDb();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await User.create(userData);

    return { success: true };
  },
);

//fn uypdate userdata
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    await connectDb();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await User.findByIdAndUpdate(id, userData);

    return { success: true };
  },
);

//Inngest Fn delete user from database

export const syncUserDeletion = inngest.createFunction(
  {
    id: "Delte-user-wite-clerk",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;
    await connectDb();
    await User.findByIdAndDelete(id);
  },
);
