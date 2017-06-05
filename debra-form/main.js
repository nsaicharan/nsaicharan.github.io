var states = ['alabama', 'california', 'florida'];

var florida = {
    name : ['John', 'Jane'],
    
    mobile: ['95202218', '298791656'],
	
	picture: ['https://placekitten.com/120/120', 'https://placekitten.com/120/121']
}

var alabama = {
    name : ['Tyrion', 'Jamie', 'Cersei'],
    
    mobile: ['65498987', '654898487', '32121658'],
	
	picture: ['https://placekitten.com/121/120', 'https://placekitten.com/121/122', 'https://placekitten.com/121/121']
}

var california = {
    name : ['Sheldon', 'Penny', 'Howard', 'Leonard'],
    
    mobile: ['65498987', '654898487', '32121658', '13654648'],
	
	picture: ['https://placekitten.com/121/120', 'https://placekitten.com/121/122', 'https://placekitten.com/122/120',  'https://placekitten.com/121/121']
}


$(".find-btn").click(function() {

    var state = $("#state").val().toLowerCase();
    
    if(states.includes(state)){
		
		$("tbody").html("");
        
       for(i=0; i<window[state]['name'].length ; i++) 
        $("tbody").append(` 
            <tr> 
			<td><img src="${window[state].picture[i]}"></td>
            <td>${window[state].name[i]}</td>
            <td> ${window[state].mobile[i]}</td>
            </tr>
        `)
		
		
		$(".results").css({"display":"block"});
        
    } else{
        console.log("state not found");
    }
    
    
})