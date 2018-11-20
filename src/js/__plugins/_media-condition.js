//////////
// MEDIA Condition helper function
//////////
function mediaCondition(cond){
  var disabledBp;
  var conditionMedia = cond.substring(1);
  var conditionPosition = cond.substring(0, 1);

  if (conditionPosition === "<") {
    disabledBp = _window.width() < conditionMedia;
  } else if (conditionPosition === ">") {
    disabledBp = _window.width() > conditionMedia;
  }

  return disabledBp
}
