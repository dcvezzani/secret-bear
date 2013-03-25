require 'browsercms'

module BcmsMy401kPresentation
  class Engine < ::Rails::Engine
		include Cms::Module
    isolate_namespace BcmsMy401kPresentation

    config.to_prepare do
      %W{Layout ErrorMessages}.each do |resource|
        Cms::ViewContext.send(:include, BcmsMy401kPresentation.module_eval("#{resource}Helper"))
        ApplicationHelper.send(:include, BcmsMy401kPresentation.module_eval("#{resource}Helper"))
      end
    end

    initializer 'bcms_my401k_presentation.route_extensions', :after => 'action_dispatch.prepare_dispatcher' do |app|
       ActionDispatch::Routing::Mapper.send :include, BcmsMy401kPresentation::RouteExtensions
    end
  end
end
