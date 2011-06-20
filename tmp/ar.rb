require 'active_record'
require 'sqlite3'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database =>  'blog.sqlite3'
)

begin
  ActiveRecord::Schema.define do
    create_table :posts do |t|
      t.text :body, :null => false
      t.timestamps
    end
    create_table :comments do |t|
      t.text :body, :null => false
      t.integer :post_id
      t.timestamps
    end
  end
rescue ActiveRecord::StatementInvalid
  # Do nothing, since the schema already exists
end
  
class Post < ActiveRecord::Base
  has_many :comments
end
class Comment < ActiveRecord::Base
  belongs_to :post
end
  
r1 = Post.new
r1.body = "ruby"
r1.save
r2 = Post.create :body => "perl"
c1 = Comment.create :body => "fajne"
r1.comments.create :body => "i like ruby"
r1.comments << c1
r2.comments << c1
