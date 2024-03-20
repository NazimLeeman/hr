class EmployeePredictor {
    // Assuming you have historical data in the form of an array of objects
    // Each object contains 'dayOfWeek' (1 to 7, where 1 is Sunday) and 'numberOfEmployees'
    private historicalData: { dayOfWeek: number; numberOfEmployees: number }[];
  
    constructor(historicalData: { dayOfWeek: number; numberOfEmployees: number }[]) {
      this.historicalData = historicalData;
    }
  
    predictEmployeesForDay(dayOfWeek: number): number | null {
      // Filter historical data for the specified day of the week
      const dayData = this.historicalData.filter(data => data.dayOfWeek === dayOfWeek);
  
      // If there is not enough data for prediction, return null
      if (dayData.length < 2) {
        return null;
      }
  
      // Extract features (day of the week) and target variable (number of employees)
      const features = dayData.map(data => [data.dayOfWeek]);
      const target = dayData.map(data => data.numberOfEmployees);
  
      // Use simple linear regression to predict the number of employees
      const { slope, intercept } = this.simpleLinearRegression(features, target);
  
      // Predict for the specified day of the week
      const predictedEmployees = slope * dayOfWeek + intercept;
  
      return Math.round(predictedEmployees);
    }
  
    private simpleLinearRegression(features: number[][], target: number[]): { slope: number; intercept: number } {
      const n = features.length;
  
      // Calculate means of features and target
      const xMean = this.mean(features.flat());
      const yMean = this.mean(target);
  
      // Calculate slope (m) and intercept (b) for the linear regression equation (y = mx + b)
      const numerator = this.covariance(features.flat(), target, xMean, yMean);
      const denominator = this.variance(features.flat(), xMean);
  
      const slope = numerator / denominator;
      const intercept = yMean - slope * xMean;
  
      return { slope, intercept };
    }
  
    private mean(values: number[]): number {
      return values.reduce((acc, val) => acc + val, 0) / values.length;
    }
  
    private covariance(x: number[], y: number[], xMean: number, yMean: number): number {
      return x.reduce((acc, val, index) => acc + (val - xMean) * (y[index] - yMean), 0) / x.length;
    }
  
    private variance(values: number[], mean: number): number {
      return values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    }
  }
  
  // Example usage
  const historicalData = [
    { dayOfWeek: 1, numberOfEmployees: 10 },
    { dayOfWeek: 2, numberOfEmployees: 15 },
    // Add more historical data for other days of the week
  ];
  
  const predictor = new EmployeePredictor(historicalData);
  const dayOfWeekToPredict = 3; // Specify the day for prediction (1 to 7)
  const predictedEmployees = predictor.predictEmployeesForDay(dayOfWeekToPredict);
  
  if (predictedEmployees !== null) {
    console.log(`Predicted number of employees for day ${dayOfWeekToPredict}: ${predictedEmployees}`);
  } else {
    console.log("Insufficient data for prediction.");
  }
  

// -----------------------------------------------------------------------
  