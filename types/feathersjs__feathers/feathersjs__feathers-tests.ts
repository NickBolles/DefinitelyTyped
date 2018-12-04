import feathers, { Application, HookContext, version, SKIP, ACTIVATE_HOOKS, activateHooks, Hook } from '@feathersjs/feathers';

version.toLowerCase();
SKIP.toString();
ACTIVATE_HOOKS.toString();
const fn = () => { };
activateHooks(true)(fn)(fn);

interface User {
    id: number;
    name: string;
}

interface Services {
    users: User;
}
interface Data {
    test: string;
}

const hook: Hook<Data> = (context) => {
    context.statusCode = 200;
    context.data = undefined;
    context.data = { test: 'true' };
    context.dispatch = { test: 'true' };
    context.result = { test: 'true' };
};

const app = feathers() as Application<Services>;

app.service('users').get(0).then(user => {
    user.id = 123;
    user.name = "foo";
});

app.service('users').hooks({
    before: {
        all: (context: HookContext<Data>) => {
            context.statusCode = 200;
            context.data = undefined;
            context.data = { test: 'true' };
            context.dispatch = { test: 'true' };
            context.result = { test: 'true' };
        },
        get: [
            hook
        ]
    }
});

const app1 = feathers<Services>();

app1.service('users').get(0).then(user => {
    user.id = 123;
    user.name = "foo";
});

app1.service('users').hooks({
    before: {
        all: (context: HookContext) => {
            context.statusCode = 200;
            context.data = undefined;
            context.data = { test: 'true' };
            context.dispatch = { test: 'true' };
            context.result = { test: 'true' };
        }
    }
});
