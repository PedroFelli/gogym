module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gogym',
  port: '5433',
  define: {
    timestamps: true,
    underscored: true,
    imderscoredAll: true,
  },
};
