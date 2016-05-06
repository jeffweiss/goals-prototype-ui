export default function() {
  this.transition(
    this.fromRoute('auth.login'),
    this.toRoute('auth.register'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
  this.transition(
    this.fromRoute('auth'),
    this.toRoute('app'),
    this.use('toUp'),
    this.reverse('toDown')
  );
}
