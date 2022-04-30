import { getNatalityData } from "../services/natalityByCCAAService";
import { getPopulationData } from "../services/populationByCCAAService";

// Obtain the data from the database
const natalityData = getNatalityData();
const populationData = getPopulationData();
