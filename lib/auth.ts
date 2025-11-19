'use client';

export function setLoggedIn(value: boolean, email?: string) {
  try {
    localStorage.setItem('ld:loggedIn', value ? '1' : '0');
    if (email) localStorage.setItem('ld:user', email);
  } catch {}
}

export function isLoggedIn(): boolean {
  try {
    return localStorage.getItem('ld:loggedIn') === '1';
  } catch {
    return false;
  }
}
