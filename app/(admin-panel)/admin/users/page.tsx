import UserItem from "@/components/users/user-item";
import classes from "./page.module.css";

import { getUsers } from "@/lib/actions";

interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default async function Users() {
  const users: UserInterface[] = await getUsers();
  return (
    <section className={classes.users}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </section>
  );
}
