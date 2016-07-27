var WordCloud = (function WordCloudModule() {
	
	function Prepare(str) {
		
		str = str.replace(/[0-9]|[.,\/#!$%\^&\*;–:{}=\-_`~()]/g,"");
		str = str.replace(/\r?\n|\r/g," "); 
		str = str.replace( /\s\s+/g," ");
		str = str.toLowerCase();
		var words = str.split(" "); 
		return words;
	}
		
	function BuildCount(words) {
		var wordCount = {};
		for(var i = 0; i < words.length; i++)
		{
			if( CheckStopWords(words[i]) ) {
				continue;
			}
			
			if( wordCount.hasOwnProperty(words[i]) ) {
				var count = wordCount[words[i]]; 
				count = count + 1; 
				wordCount[words[i]] = count; 
			}
			else {
				var key = words[i]; 
				wordCount[key] = 1;	
			}
		}
		return wordCount; 	
		
		function CheckStopWords(thisWord) {
			var stopWords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];
			for(var i = 0; i < stopWords.length; i++) {
				if(stopWords[i] == thisWord) {
					return true; 
				}
			}
			return false;
		}
	}
	
	function GetTopWords(x, wordCount) {
		var arr = [];
		var keysSorted = Object.keys(wordCount).sort(function(a,b){return wordCount[b]-wordCount[a]}); 
		
		for(var i = 0; i < x; i++) {
			if(keysSorted[i]) {
				arr.push(keysSorted[i]);
			}
			else{
				break;
			}
		}
		
		return arr; 
	}
	
	function PrintWordCount(obj) { 
		console.log("Found " + Object.keys(obj).length + " unique words.");
		for(w in obj) {
			console.log(w + " > " + obj[w]);		
		}
	}






	return {
		BuildCount: BuildCount,
		GetTopWords: GetTopWords,
		Prepare: Prepare,
		PrintWordCount: PrintWordCount
	};	
	
})();




function run() 
{
	var str = document.getElementById("corpus").value;
		
	document.getElementById("depth").classList.remove("error-input");
	document.getElementById("depth").offsetWidth = document.getElementById("depth").offsetWidth;  //css hack to restart transitions
	var depth = document.getElementById("depth").value; 
	if( !depth || depth == "" || isNaN(depth) || Math.round(depth) == 0 ) {
		//error handling for the depth input value... using CSS transitions
		document.getElementById("depth").className = "error-input";
		return false;
	}

	var area = document.getElementById('output'); 
	while(area.hasChildNodes()) {
		//clear out the output area every time user generates word cloud
		area.removeChild(area.firstChild);
	}
	
	//build the word cloud using the WordCloud module
	var words = WordCloud.Prepare(str);
	var wordCount = WordCloud.BuildCount(words);
	var finalWords = WordCloud.GetTopWords(depth, wordCount);
	//WordCloud.PrintWordCount(wordCount);
		
	//the algorithm to loop through the word cloud's X most used words and populate the output area	
	for(var i = 0; i < finalWords.length; i++)
	{
		var px = 10 + ( wordCount[finalWords[i]] * 2 );  //how large to display this word is 10 plus two times the number of instances we found
		htmlString = "<span style='font-size:" + px + "px;' title='this word was used " + wordCount[finalWords[i]] +" times'>" + finalWords[i] + "</span>"; 
		if( (i != 0) && (i % 5 == 0) ) {
			//add a line break to the output area every 5 words
			htmlString = htmlString + "<br>"
		}
		area.innerHTML = area.innerHTML + htmlString;
	}
}