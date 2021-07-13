# 2 - Belajar Basic NestJS dengan Sequelize

Belajar API backend dengan NestJS dan sequelize untuk koneksi ke database. Sudah di sertakan untuk pembuatan migration dan seeder.

### Menjalankan aplikasi:

- Clone repo ini taruh di mana saja di komputer anda.

- Jalankan perintah ini:

```bash
$ npm install

# untuk membuat tabel baru dengan nama file `database-dev.sqlite`
$ npm run db:migrate

# untuk membuat user baru dari file seeder
$ npm run db:seed

# memulai aplikasi
$ npm run start
```

- Buka browser dengan url: `http://localhost:3000/api/v1/`

- Done.

## Planing pengerjaan:

- [x] Koneksi ke database
- [x] Buat migration
- [x] Buat seeder
- [x] Buat API untuk modules `/users`
  - [x] [GET] Get all users
  - [x] [POST] Create user (with unique validation)
  - [x] [PUT] Update user (with unique validation)
  - [x] [GET] Show user
  - [x] [DELETE] Delete user
- [ ] Buat authenticate dengan JWT
- [ ] Buat auth login
