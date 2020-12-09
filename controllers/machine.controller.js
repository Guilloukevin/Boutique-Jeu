exports.getListeMachinePage = async (req, res) => {
    
    const machines  = await query( 'SELECT Nom, machineId FROM machine')
    console.log('machines :', machines)
    try {
      res.render('machines', { 
          consoles : machines
          //machines : machines
      //  console : machines
      // categories
      });
    } catch (e) {
      res.send(e)
    }
  };

exports.getAjouteMachinePage = async (req, res) => {
    
    try {
    res.render('machine/ajouterMachine');
        } 
    catch (e) {
    res.send(e)
    }
};