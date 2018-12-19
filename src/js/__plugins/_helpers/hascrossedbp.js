// check if certain breakpoint was went through
function hasCrossedBreakpoint(prevResize, curWidth, targetBp){
  if ( ((curWidth >= targetBp) && (prevResize <= targetBp)) || ((curWidth <= targetBp) && (prevResize >= targetBp)) ){
    return true
  }
  return false
}
