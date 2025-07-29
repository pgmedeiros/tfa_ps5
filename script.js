function init() {
  let type = 'REAL_DOT' // irá vir do usuário
  let impl = factory(type);
  core(impl).process();
}

function factory(type) {
  if(type == 'REAL_DOT') {
    return new RealDotImpl();
  }

}

init();
