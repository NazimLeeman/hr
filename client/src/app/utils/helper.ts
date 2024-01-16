function predict(totalEmployees: number, totalOrderPreparationTime: number): string {
    const compareTime = (totalEmployees * 360) - totalOrderPreparationTime;

    if (compareTime >= 0) {
        return 'No employees needed currently';
    } else {
        const employeesNeeded = Math.ceil(-compareTime / 60);
        return `${employeesNeeded} employee${employeesNeeded === 1 ? '' : 's'} needed`;
    }
}
