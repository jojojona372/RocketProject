class Mass{
	constructor(eMass, pMass, fMass, fMax) {
		this.empty = eMass;
		this.payload = pMass;
		if(this.fuel > fMax) {
			this.fuel = fMax;
		} else {
			this.fuel = fMass;
		}
		this.fuelMax = fMax;
		this.total = eMass+pMass+fMass;
	}
}