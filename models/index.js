const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^[\w\d]+$/
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: Sequelize.ENUM('open', 'closed')
});

Page.beforeValidate((post) => {
    post.slug = post.slug.replace(/\s+/g, '_').replace(/\W/g, '');
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
});

module.exports = {
    db,
    Page,
    User
  }
