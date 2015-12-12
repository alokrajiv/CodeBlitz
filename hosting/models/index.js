var mongoose = require ('mongoose'),
	exports = module.exports = {};
mongoose.connect('mongodb://localhost/codeblitz_db')

exports.GroupModel = mongoose.model('groupsModel', new mongoose.Schema({ 
		groupNo: {
			type: Number, 
			index: {
				unique: true
				}
			},
		groupPassword: {
			type: String, 
			index: {
				unique: true
				}
			},
		groupQuestions: [new mongoose.Schema({ 
			questionNo: Number,
			questionTitle: String,
			questionContent: String
		})]
	},
	{
		collection: 'groupCollection'
	}
));

//QuestionBankModel NOT USED ANYMORE
/*
exports.QuestionBankModel = mongoose.model('questionBankModel', new mongoose.Schema({ 
		questionNo: {
			type: Number, 
			index: {
				unique: true
				}
			},
		questionTitle: {
			type: String, 
			index: {
				unique: true
				}
			},
		questionContent: String
	},
	{
		collection: 'questionBankCollection'
	}
));

*/