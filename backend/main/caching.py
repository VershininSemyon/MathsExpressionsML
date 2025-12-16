
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from django.views.decorators.cache import cache_page, cache_control
from django.utils.decorators import method_decorator


def cache_api_view(timeout, key_prefix):
    def decorator(view_method):
        return method_decorator(cache_control(
            private=True,
            no_cache=True,
            no_store=True,
            must_revalidate=True
        ))(
            method_decorator(vary_on_cookie)(
                method_decorator(vary_on_headers("Authorization"))(
                    method_decorator(cache_page(timeout, key_prefix=key_prefix))(
                        view_method
                    )
                )
            )
        )
    return decorator
