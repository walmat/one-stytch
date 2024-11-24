export function truncateEmail(email: string): string {
  const [username, domain] = email.split("@");
  if (username.length <= 10) {
    return email;
  }
  const truncatedUsername = `${username.slice(0, 10)}...`;
  return `${truncatedUsername}@${domain}`;
}