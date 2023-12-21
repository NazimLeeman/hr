import Position from "./position.model";

export async function createPositionForEmployee (employeeId: number, data: { 
    name: string
 }) {
  try {
    let position = await Position.findOne({
      where: {
        employeeId: employeeId,
        // restaurantId: restaurantId
      }
    })
    if (!position) {
      throw new Error('Employee not found.');
    }
    const newPosition = await Position.create({ ...data, employeeId });
    return newPosition;
  } catch (error) {
    console.log(error)
    throw new Error('Error creating position for employee.');
  }
}