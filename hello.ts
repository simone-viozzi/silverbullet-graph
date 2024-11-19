// Importa le syscall necessarie
import { editor } from "@silverbulletmd/silverbullet/syscalls";

export async function hello() {
  await editor.flashNotification("Hello world!");
}
