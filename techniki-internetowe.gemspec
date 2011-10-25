# -*- coding: utf-8 -*-

$:.push File.expand_path("..", __FILE__)
require "version"

Gem::Specification.new do |s|
  s.name        = "techniki-internetowe"
  s.version     = "1.0.0"
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Włodek Bzyl"]
  s.email       = ["matwb@ug.edu.pl"]
  s.homepage    = "http://inf.ug.edu.pl/~wbzyl"
  s.summary     = %q{Notatki do wykładu „Techniki internetowe”}
  s.description = %q{Notatki do wykładu „Techniki internetowe”. 2010/2011}

  # If you have other dependencies, add them here
  # s.add_runtime_dependency 'rack'
  s.add_runtime_dependency 'sinatra'
  s.add_runtime_dependency 'rdiscount'
  s.add_runtime_dependency 'erubis'
  #s.add_runtime_dependency 'json'

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }

  s.require_path = 'lib'
end
