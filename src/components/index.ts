import TLEditor from "./editor/index.vue"

export { TLEditor };

const  root= {
    install(App:any) {
        App.component("TLEditor", TLEditor);
    },
};

export default root;