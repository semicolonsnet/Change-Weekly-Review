var _ = function(){
	var action = new PlugIn.Action(function(selection){
		// Set up calendar
		var cal = Calendar.current
    	var now = new Date()
    	var today = cal.startOfDay(now)

    	// Set up input form
    	var inputForm = new Form()
    	dateInput = new Form.Field.Date("date", "Review Date", today)
   	 	inputForm.addField(dateInput)
    	console.log("function start")
    	formPrompt = "Select Date for Next Weekly Review"
		buttonTitle = "OK"

    	// Display input form
    	formDate = inputForm.show(formPrompt, buttonTitle)

    	// Validate input form
    	inputForm.validate = function(formObject){
      	var dateObject = formObject.values['date']
      	dateStatus = (dateObject && dateObject > new Date()) ? true:false
    		return dateStatus
    	}

	   	// Changes review date for all projects where review happens before target date
	   	formDate.then(function(formObject){
       	console.log("then started")
       	console.log(formObject.values['date'])
       	var dateObject = formObject.values['date']
       	// Set target date to six days from today
      	var dc = new DateComponents()
       	dc.day = 6
       	var targetDate = cal.dateByAddingDateComponents(today,dc)
       	console.log(targetDate)
			library.apply(item => {
				if (item instanceof Project){
					if (item.nextReviewDate < targetDate) {
						console.log(item.name)
						item.nextReviewDate = dateObject
					}
			}
     	 })
    	})
    // PROCESS FORM CANCELLATION
    formDate.catch(function(error){
      console.log("form cancelled", error)
    })

  });
	return action;
	}();
_;