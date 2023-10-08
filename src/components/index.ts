import Editor from "./editor/index.vue"

export { Editor };

const  root= {
    install(App:any) {
        App.component("TLEditor", Editor);
    },
};

export default root;