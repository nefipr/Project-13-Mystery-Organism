// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAequorFactory = (specimenNum,dna) =>{
    return {
      specimenNum,
      dna,
      mutate(){
        const oldDnaIndex = [Math.floor(Math.random() * 15)];
        const oldDna = this.dna[oldDnaIndex];
        console.log('This is the old DNA ' + oldDna + ' '+ oldDnaIndex);
        
        // let newDna = this.dna[Math.floor(Math.random() * 4)];
        let newDna = returnRandBase();
        console.log('This is the new DNA ' + newDna);

        while(this.dna[oldDnaIndex] === newDna){
          newDna = returnRandBase();
          console.log('New DNA cant be the same, this is the new dna ' + newDna);
        }
        this.dna[oldDnaIndex] = newDna;
        return this.dna;
      },
      compareDNA(object){
        let commonDna = 0;
        
        for (let i = 0; i < this.dna.length; i++){
          for (let j = 0; j < object.dna.length; j++){
            if(this.dna[i] === object.dna[j]){
              commonDna +=1;
            }
          }
        }
        let averageDna = (commonDna / this.dna.length ) * 10;
        console.log(`specimen #1 and specimen #2 have ${averageDna.toFixed(2)}% DNA in common.`)
      },
      willLikelySurvive(){
        return this.dna.filter(dna => dna === 'C' || dna === 'G') / this.dna.length >= 0.6;
      },
    }
}

// Function test
let pAequor = pAequorFactory(1,mockUpStrand());
// console.log(pAequor);
// console.log(pAequor.mutate());


let specimen = pAequorFactory(2,mockUpStrand());
// console.log(specimen);
// pAequor.compareDNA(specimen);


const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen)


