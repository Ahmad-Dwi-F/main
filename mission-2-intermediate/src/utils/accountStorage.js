const ACCOUNTS_KEY = "videobelajar_accounts";

function getAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function findAccountByEmail(email) {
  return getAccounts().find(
    (acc) => acc.email.toLowerCase() === email.toLowerCase(),
  );
}

export function saveAccount(account) {
  const accounts = getAccounts();
  accounts.push(account);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}
