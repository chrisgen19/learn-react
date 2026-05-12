// use this api to fetch random users

// https://randomuser.me/api/?results=5&gender=female&nat=ph  // philippine

import { useState, useEffect } from 'react'
import styles from './Fetch.module.css'

const API_URL = 'https://randomuser.me/api/?results=5&gender=female&nat=ph'

function getErrorMessage(err) {
  if (err instanceof Error) return err.message
  return String(err)
}

export default function Fetch() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }
        return response.json()
      })
      .then((data) => {
        setUsers(Array.isArray(data.results) ? data.results : [])
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(getErrorMessage(err))
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  if (loading) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>Fetch</h1>
        <p className={styles.subtitle}>Random users (Philippines)</p>
        <p className={styles.loading}>Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>Fetch</h1>
        <p className={styles.subtitle}>Random users (Philippines)</p>
        <p className={styles.error} role="alert">
          {error}
        </p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>Fetch</h1>
        <p className={styles.subtitle}>Random users (Philippines)</p>
        <p className={styles.loading}>No users found.</p>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Fetch</h1>
      <p className={styles.subtitle}>Random users (Philippines)</p>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={`${styles.th} ${styles.thAvatar}`}
                scope="col"
                aria-label="Photo"
              />
              <th className={styles.th} scope="col">
                Name
              </th>
              <th className={styles.th} scope="col">
                Email
              </th>
              <th className={styles.th} scope="col">
                City
              </th>
              <th className={styles.th} scope="col">
                Country
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className={styles.tr} key={user.login?.uuid ?? user.email}>
                <td className={`${styles.td} ${styles.avatarCell}`}>
                  {user.picture?.thumbnail ? (
                    <img
                      className={styles.avatar}
                      src={user.picture.thumbnail}
                      alt=""
                      width={40}
                      height={40}
                    />
                  ) : (
                    '—'
                  )}
                </td>
                <td className={`${styles.td} ${styles.tdStrong}`}>
                  {user.name?.first} {user.name?.last}
                </td>
                <td className={`${styles.td} ${styles.tdMono}`}>{user.email}</td>
                <td className={styles.td}>{user.location?.city}</td>
                <td className={styles.td}>{user.location?.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
