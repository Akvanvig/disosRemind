//https://izy521.gitbooks.io/discord-io/content/Resources/Role.html
module.exports = class Role {
        constructor(name, id, position, managed, permissions, mentionable, hoist, color) {
            this.name = name;
            this.id = id;
            this.position = position;
            this.managed = managed;
            this.permissions = permissions;
            this.mentionable = mentionable;
            this.hoist = hoist;
            this.color = color;
        }
}
