Template.comment.helpers({
  submittedText: function(){
//    return moment(this.submitted).format('HH:mm ddd DD MMM YYYY');
    return moment(this.submitted).fromNow();
  }
});
