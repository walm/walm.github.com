
desc "list tasks"
task :default do
  system "rake -T"
end

desc "generate website"
task :generate => :clean do
  puts "Generating website..."
  system "jekyll"
end

desc "minify javascript and css"
task :minify do
  puts "Minify javascript and css.."
  system "juicer merge -s -d ./ js/plugin.js js/script.js -o js/all.min.js --force"
  system "juicer merge -s -d ./ css/style.css css/syntax.css -o css/all.min.css --force"
end

desc "remove files in _site directory"
task :clean do
  puts "Removing output..."
  Dir["_site/*"].each { |f| rm_rf(f) }
end

desc "start server in automode"
task :server => :minify do
  puts "Start server..."
  system "jekyll --server --auto"
end

