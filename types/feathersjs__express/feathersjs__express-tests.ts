import feathers, { Application } from '@feathersjs/feathers';
import feathersExpress, * as express from '@feathersjs/express';

interface User {
    id: number;
    name: string;
}

interface Services {
    users: User;
}

const app = feathersExpress<Services>(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('./public'));
app.configure(express.rest());
app.use(express.notFound());
app.use(express.errorHandler({ logger: console }));

app.service("users").get(0).then(user => {
    user.id = 123;
    user.name = "foo";
});
