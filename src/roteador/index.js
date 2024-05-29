import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import Lista from "@/views/projetos/Lista.vue";
import Formulario from "@/views/projetos/Formulario.vue";


const routes = [
    {   path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: Formulario,
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})


export default router