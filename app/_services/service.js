/**
 * Get unique user list from attendance records.
 * @returns {Array}
 */
export const getUniqueRecord = (attendanceList) => {
  const uniqueRecord = [];
  const existingUser = new Set();
  
  attendanceList?.forEach(record => {
    if (!existingUser.has(record.studentId)) {
      existingUser.add(record.studentId);
      uniqueRecord.push(record);  // Only push if not added before
    }
  });

  return uniqueRecord;
};
