
desc "list tasks"
task :default do
  system "rake -T"
end

desc "generate website" 
task :generate => :clean do
  puts "Generating website..."
  system "jekyll"
end

desc "remove files in _site directory"
task :clean do
  puts "Removing output..."
  Dir["_site/*"].each { |f| rm_rf(f) }
end

desc "start server in automode"
task :server do
  puts "Start server..."
  system "jekyll --server --auto"
end

