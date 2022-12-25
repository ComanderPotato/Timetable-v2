export const getNameSuggestions = async (searchText, assignments) => {
  return assignments.filter(assignment => assignment.subjectId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
}

export const getIdSuggestions = async (searchText, assignments) => {
  return assignments.filter(assignment => assignment.subjectName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
}